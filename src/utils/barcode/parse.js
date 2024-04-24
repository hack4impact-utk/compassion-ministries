// Map of scan keys to their human-readable fields
const CODE_TO_KEY = {
  DCA: 'jurisdictionVehicleClass',
  DCB: 'jurisdictionRestrictionCodes',
  DCD: 'jurisdictionEndorsementCodes',
  DBA: 'expireDate',
  DCS: 'lastName',
  DAC: 'firstName',
  DAD: 'middleName',
  DBD: 'dateOfIssue',
  DBB: 'dateOfBirth',
  DBC: 'sex',
  DAY: 'eyeColor',
  DAU: 'height',
  DAG: 'addressStreet',
  DAI: 'addressCity',
  DAJ: 'addressState',
  DAK: 'addressPostalCode',
  DAQ: 'documentNumber',
  DCF: 'documentDiscriminator',
  DCG: 'issuer',
  DDE: 'lastNameTruncated',
  DDF: 'firstNameTruncated',
  DDG: 'middleNameTruncated',
  // optional
  DAZ: 'hairColor',
  DAH: 'addressStreet2',
  DCI: 'placeOfBirth',
  DCJ: 'auditInformation',
  DCK: 'inventoryControlNumber',
  DBN: 'otherLastName',
  DBG: 'otherFirstName',
  DBS: 'otherSuffixName',
  DCU: 'nameSuffix', // e.g. jr, sr
  DCE: 'weightRange',
  DCL: 'race',
  DCM: 'standardVehicleClassification',
  DCN: 'standardEndorsementCode',
  DCO: 'standardRestrictionCode',
  DCP: 'jurisdictionVehicleClassificationDescription',
  DCQ: 'jurisdictionEndorsementCodeDescription',
  DCR: 'jurisdictionRestrictionCodeDescription',
  DDA: 'complianceType',
  DDB: 'dateCardRevised',
  DDC: 'dateOfExpiryHazmatEndorsement',
  DDD: 'limitedDurationDocumentIndicator',
  DAW: 'weightLb',
  DAX: 'weightKg',
  DDH: 'dateAge18',
  DDI: 'dateAge19',
  DDJ: 'dateAge21',
  DDK: 'organDonor',
  DDL: 'veteran',
  TYP: 'barcodeType',
  DAA: 'raiFullName',
  DCT: 'firstName',
  DAL: 'addressStreet',
  DAO: 'addressState',
  DAN: 'addressCity',
  DAB: 'lastName',
};

export const CODES = Object.keys(CODE_TO_KEY);

// -----------------
// > US code closure
// -----------------
export const usParse = (() => {
  // This uses the keys in CODE_TO_KEY to build a regex which
  // basically says find a key followed by a string which
  // is then followed by either a key, a line beginning with Z
  // or a line ending.
  //
  // flags:
  // - g - global; don't stop at the first match
  // - m - multiline; matches follow newlines
  // - i - ignore case
  // - s - `.` includes newlines
  const regexUsParse = (str) => {
    const keys = CODES.join('|');
    const regexp = new RegExp(
      `((?<key>${keys})(?<val>.+?)(?=${keys}|^Z|$))`,
      'gmis'
    );

    return str.match(regexp).reduce((matches, match) => {
      const [key, val] = match
        .split(/^(\w{3})/)
        .filter(Boolean)
        .map((s) => s.trim());

      // Don't overwrite anything
      if (matches[key] === undefined) matches[key] = val;
      return matches;
    }, {});
  };

  // Wrap the code for dynamic value evaluation
  const getFieldWrapper = (code) => parseMap(code);

  // Returns a function used to get the field for a given
  // code/field pair
  const getValueFn = (code, field) => {
    if (isSexField(code)) return getSex;
    if (isDateField(field)) return getDateFormat;
    if (isFullNameField(code)) return getFullName;
    // if (isFirstMiddleField(code)) return getItself;
    if (isWeightField(code)) return getWeight;
    return getItself;
  };

  // Used in `getValueFn` to determine which function
  const isSexField = (code) => code === 'DBC';
  const isDateField = (field) => /[dD]ate/.test(field);
  const isFullNameField = (code) => code === 'DAA';
  const isWeightField = (code) => ['DAW', 'DAX'].includes(code);

  // ----------------------------
  // - * GET VALUE FUNCTIONS *
  // ----------------------------
  // * Each function should accept both `field` and `line`,
  // though, they don't both have to be used.
  //
  // * Each function should return an object that will be merged into
  // the parsed result.
  //  Ex: { expireDate: "06/03/2026" }

  // Returns a date of MM/DD/YYYY
  const getDateFormat = (field, line) => {
    // Sanitize the line
    line = line.replace(/[^0-9]/g, '');
    // Determine what format the date appears in
    const isMonthFirst = parseInt(line.slice(0, 2), 10) < 13;
    const parts = (isMonthFirst && [
      line.slice(0, 2),
      line.slice(2, 4),
      line.slice(4),
    ]) || [line.slice(4, 6), line.slice(6), line.slice(0, 4)];
    const result = {};
    // Format the parts as (MM/DD/YYYY)
    let value = parts.join('/');
    // Determine if the value is a valid date. If not, return null
    if (value && isNaN(new Date(value).getTime())) {
      value = null;
    }
    result[field] = value;
    return result;
  };

  // Returns just the line value given
  const getItself = (field, line) => {
    const result = {};
    result[field] = line.trim();
    return result;
  };

  // Parses the fullName from line
  const getFullName = (_field, line) => {
    let first, middle, last;
    // If name is comma-separated, it will be in `LAST, FIRST, MIDDLE` format
    if (/,/.test(line)) {
      [last, first, middle] = line
        .split(',')
        .map((str) => (str && str.trim()) || '');

      // If no commas are present, it's likely `FIRST MIDDLE LAST` format
    } else {
      const parts = line.split(' ');
      // Get the head
      first = parts.shift().trim();
      // Get the tail
      last = parts.reverse().shift().trim();
    }

    const result = {};
    result.firstName = first;
    result.lastName = last;
    return result;
  };

  // Convert 1 to M, 2 to F, otherwise return the line
  const getSex = (field, line) => {
    const result = {};

    result[field] = ((v) => {
      if (v === '1') return 'M';
      if (v === '2') return 'F';
      return v;
    })(line);

    return result;
  };

  // Grab just a max of 3 digits from line
  const getWeight = (field, line) => {
    const result = {};

    result[field] = line.slice(0, 3);
    return result;
  };

  // Returns a function that wraps the given `code`
  // in a helper object that provides both the corresponding
  // field and a function for dynamically getting the value.
  const parseMap = (() => {
    const map = CODES.reduce((result, code) => {
      const field = CODE_TO_KEY[code];
      result[code] = {
        field,
        value: getValueFn(code, field),
      };
      return result;
    }, {});

    return (code) => map[code];
  })();

  // -- METADATA FUNCTIONS
  const matchBarcode = (regex) => {
    return (barcode) => {
      return barcode.match(regex);
    };
  };
  const matchDateRevised = matchBarcode(/DDB(\d{8})/);
  const matchBarcodeType = matchBarcode(/ansi|aamva/i);
  const matchState = matchBarcode(/DAJ(\w{2})/);

  // Uses the above match functions to build a metadata object
  const getBarcodeMeta = (barcode) => {
    let date = matchDateRevised(barcode);
    date = (date && getDateFormat('date', date[1]).date) || 'not specified';

    let type = matchBarcodeType(barcode);
    type = (type && type[0]) || 'not specified';

    let state = matchState(barcode);
    state = (state && state[1]) || 'not specified';
    return { dateRevised: date, type, state };
  };

  // Returns a function which accepts a barcode,
  // parses the barcode and returns an object
  return (barcode) => {
    const parsedObject = regexUsParse(barcode);
    const metadata = getBarcodeMeta(barcode);

    return Object.keys(parsedObject).reduce(
      (obj, code) => {
        const line = parsedObject[code];
        const wrapper = getFieldWrapper(code);
        if (!wrapper) {
          return { ...obj, errors: [...obj.errors, { code, line }] };
        }
        const field = wrapper.field;
        const value = wrapper.value(field, line);
        return { ...obj, ...value };
      },
      { metadata, errors: [], barcodeType: metadata.type }
    );
  };
})();

export default {
  usParse,
};
