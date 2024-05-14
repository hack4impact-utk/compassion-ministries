import { getSettings } from '@/server/actions/Settings';
import { getAllUsers } from '@/server/actions/User';
import { SettingsResponse } from '@/types/dataModel/settings';
import { adminAuth } from '@/utils/auth';
import SettingsView from '@/views/SettingsView';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  let settings: SettingsResponse;
  try {
    await adminAuth();
    settings = await getSettings();
  } catch (e) {
    redirect('/');
  }
  const users = await getAllUsers();
  return <SettingsView users={users} settings={settings} />;
}
