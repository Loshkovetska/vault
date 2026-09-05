import { Header } from '@/components/common/header';
import { Layout } from '@/components/common/layout';
import BalanceWidget from '@/components/features/home/balance-widget';
import { PromoList } from '@/components/features/home/promo-list';
import { RecentActivity } from '@/components/features/home/recent-activity';
import { useGetVaultCardQuery } from '@/lib/store/vault_card';
import { useAuth } from '@/providers/auth-session';

export default function HomeScreen() {
  const { currentUser } = useAuth();
  const { data: vaultCard } = useGetVaultCardQuery(undefined);

  const lname = currentUser?.full_name?.split(' ')?.[1] ?? '';

  return (
    <>
      <Header title={`Hi, ${lname}`} subtitle="Ready to start your today" />
      <Layout>
        <BalanceWidget balance={vaultCard?.balance ?? 0} />
        <PromoList session_id={currentUser?.id ?? ''} />
        <RecentActivity session_id={currentUser?.id ?? ''} />
      </Layout>
    </>
  );
}
