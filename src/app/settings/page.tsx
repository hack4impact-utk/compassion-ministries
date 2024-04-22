import { getAllUsers } from '@/server/actions/User';
import SettingsView from '@/views/SettingsView';

export default async function SettingsPage() {
  const users = await getAllUsers();
  return <SettingsView users={users} />;
}
