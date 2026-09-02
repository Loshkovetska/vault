import { ActionButton } from '@/components/common/action-button';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Text } from '@/components/ui/text';
import {
  useDeleteSessionMutation,
  useGetSessionsQuery,
} from '@/lib/store/sessions';
import { activityFormate } from '@/lib/utils/date';
import { useAuth } from '@/providers/auth-session';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
  list: { gap: 16 },
  item: {
    flexDirection: 'row',
    gap: 8,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 8,
  },
  item_selected: {
    backgroundColor: theme.colors['brand-500'],
  },
}));

export function DeviceManagementScreen() {
  const { currentUser } = useAuth();
  const { data: devices = [] } = useGetSessionsQuery(currentUser?.id ?? '', {
    skip: !currentUser,
  });
  const [mutate] = useDeleteSessionMutation();
  const [selected, setSelected] = useState<string | null>(null);
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    DeviceInfo.getIpAddress().then(setIp);
  }, []);

  return (
    <>
      <HeaderDetails position="left" title="Device Management" />
      <Layout>
        <View style={styles.container}>
          <Text typo="text-xl" weight={500}>
            Active Devices
          </Text>
          <View style={styles.list}>
            {devices?.map(device => (
              <TouchableOpacity
                style={[
                  styles.item,
                  ...(selected === device.id ? [styles.item_selected] : []),
                ]}
                key={device.id}
                onPress={() => setSelected(device.id)}
              >
                <Text typo="text-lg" weight={500}>
                  &bull;
                </Text>
                <View>
                  <Text typo="text-lg" weight={500}>
                    {device.device}{' '}
                    {device.ip_address === ip ? `(This device)` : ''}
                  </Text>
                  <Text typo="text-lg" weight={500}>
                    {device.location} - Last active{' '}
                    {activityFormate(device.last_at)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Layout>
      <ActionButton
        disabled={!selected}
        onPress={() => mutate(selected!).then(() => setSelected(null))}
      >
        Logout This Device
      </ActionButton>
    </>
  );
}
