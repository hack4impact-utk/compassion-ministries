import { getAllUsers } from '@/server/actions/User';
import { adminAuth } from '@/utils/auth';
import SettingsView from '@/views/SettingsView';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  try {
    await adminAuth();
  } catch (e) {
    redirect('/');
  }
  const users = await getAllUsers();
  return <SettingsView users={users} />;
}
