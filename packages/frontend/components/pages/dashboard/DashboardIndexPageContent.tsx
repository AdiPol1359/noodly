import { PageTitle } from 'components/dashboard/PageTitle';
import { useUser } from 'hooks/useUser';

export const DashboardIndexPageContent = () => {
  const { data } = useUser();

  return <PageTitle title={`Witaj, ${data?.details.firstName}!`} />;
};
