const BASE_URL = process.env.BV_BASE_URL;

class BackgroundCheckService {
  private static instance: BackgroundCheckService;
  private token?: string;

  constructor() {
    if (BackgroundCheckService.instance) {
      return BackgroundCheckService.instance;
    }

    const { BV_USER, BV_PASS } = process.env;

    if (!BASE_URL || !BV_USER || !BV_PASS) {
      throw new Error(
        'Must define BV_BASE_URL, BV_USER, and BV_PASS environment variables to use the BackgroundCheckService.'
      );
    }

    BackgroundCheckService.instance = this;
  }

  // ================
  // Public Methods
  // ================
  async initiateBackgroundCheck(email: string) {
    const inviteId = await this.#inviteVolunteer([email]);
    return this.#payForInvite(inviteId);
  }

  // ================
  // Private Methods
  // ================

  /**
   * Invites a volunteer to complete a background check.
   * @param emails The emails of the volunteers to invite.
   * @returns The ID of the background check.
   */
  async #inviteVolunteer(emails: string[]) {
    await this.#login();

    const res = await this.#post('/v2-api/company/employee/invite', {
      package: 'basic',
      email_list: emails,
      add_ons: {
        employment: 0,
        education: 0,
        license: 0,
        driving_license: 0,
        civil_court: 0,
        county_criminal_search: 0,
        all_county_criminal_search: false,
        MVR: false,
        professional_reference: [],
      },
    });

    const { data } = await res.json();
    return data.id;
  }

  /**
   * Pays for a background check invite and sends the email
   * @param inviteId The ID of the invite to pay for.
   * @returns Whether the payment was successful.
   */
  async #payForInvite(inviteId: string) {
    await this.#login();

    const res = await this.#post('/v2-api/company/payment/charge-user', {
      id: inviteId,
      send_email: true,
    });

    return res.ok;
  }

  /**
   * Logs in to the background check service sets the token. **This must be run before any other methods.**
   */
  async #login() {
    if (this.token) return this.token;

    // Login to the background check service
    const res = await this.#post('/auth/login', {
      email: process.env.BV_USER,
      password: process.env.BV_PASS,
      role: 'admin',
    });
    const data = await res.json();

    this.token = data.token;
  }

  #request(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: unknown
  ): Promise<Response> {
    return fetch(BASE_URL + endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  #get(endpoint: string) {
    return this.#request(endpoint, 'GET');
  }

  #post(endpoint: string, body: any) {
    return this.#request(endpoint, 'POST', body);
  }
}

export default new BackgroundCheckService();
