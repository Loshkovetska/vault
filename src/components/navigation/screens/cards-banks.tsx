import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { CardPreview } from '@/components/common/card-preview';
import { GlassButton } from '@/components/ui/glass-button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { toast } from '@/lib/helpers/toast';
import { useNavigate } from '@/lib/hooks/use-navigate';
import {
  useDeleteBankAccountMutation,
  useGetBankAccountsQuery,
} from '@/lib/store/bank_accounts';
import { useDeleteCardMutation, useGetCardsQuery } from '@/lib/store/cards';
import { themeConfig } from '@/lib/theme';
import { screenWidth } from '@/lib/utils/device';
import { encryptCardNumber } from '@/lib/utils/string';
import { useAuth } from '@/providers/auth-session';
import { AddSquare } from '@solar-icons/react-native/Linear';
import { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BankPreview } from '@/components/common/bank-preview';
import { ActionsDialog } from '@/components/features/card/actions-dialog';

const styles = StyleSheet.create({
  block: {
    gap: 12,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 24,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  space: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
});

export function CardsBanksScreen() {
  const { goToCardEditor, goToAccountEditor } = useNavigate();
  const [deleteAccount] = useDeleteBankAccountMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [cSettingsOpen, setCSettingsOpen] = useState<string | null>(null);
  const [bSettingsOpen, setBSettingsOpen] = useState<string | null>(null);

  const { currentUser } = useAuth();

  const { data: bank_accounts } = useGetBankAccountsQuery(
    currentUser?.id ?? '',
    {
      skip: !currentUser,
    },
  );

  const { data: cards } = useGetCardsQuery(currentUser?.id ?? '', {
    skip: !currentUser,
  });

  const onDelete = useCallback(
    (type: 'card' | 'account', id: string) => {
      if (type === 'account') {
        deleteAccount(id)
          .then(() => toast.success('Account deleted!'))
          .catch(() => toast.error('Failed to delete account!'));
        return;
      }
      deleteCard(id)
        .then(() => toast.success('Card deleted!'))
        .catch(() => toast.error('Failed to delete card!'));
    },
    [deleteAccount, deleteCard],
  );

  return (
    <>
      <HeaderDetails position="left" title="Cards & Banks" />
      <Layout>
        <View style={styles.space}>
          <Text typo="display-xs" textAlign="center" weight={600}>
            Saved Cards
          </Text>
        </View>
        <FlatList
          data={cards ?? []}
          horizontal
          pagingEnabled
          keyExtractor={item => item.id}
          scrollEnabled={(cards ?? [])?.length > 1}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View key={item.id} style={{ width: screenWidth }}>
              <CardPreview
                card_number={encryptCardNumber(item?.card_number ?? '')}
                holder={item?.card_holder ?? ''}
                expired_at={item?.expired_at ?? ''}
                onPress={() => setCSettingsOpen(item.id)}
              />
            </View>
          )}
        />

        <View style={styles.space}>
          <GlassButton
            onPress={() => goToCardEditor()}
            iconLeft={
              <AddSquare size={20} color={themeConfig.colors['gray-900']} />
            }
          >
            Add Card
          </GlassButton>
        </View>
        <View style={styles.space}>
          <Separator />
        </View>
        <View style={styles.space}>
          <Text typo="display-xs" textAlign="center" weight={600}>
            Linked Bank Accounts
          </Text>
        </View>

        <FlatList
          data={bank_accounts ?? []}
          horizontal
          keyExtractor={item => item.id}
          scrollEnabled={(bank_accounts ?? [])?.length > 1}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View key={item.id} style={{ width: screenWidth }}>
              <BankPreview
                bankAccount={item}
                onPress={() => setCSettingsOpen(item.id)}
              />
            </View>
          )}
        />

        <View style={styles.space}>
          <GlassButton
            onPress={() => goToAccountEditor()}
            iconLeft={
              <AddSquare size={20} color={themeConfig.colors['gray-900']} />
            }
          >
            Connect Bank Account
          </GlassButton>
        </View>
      </Layout>

      <ActionsDialog
        open={!!cSettingsOpen}
        onOpenChange={() => setCSettingsOpen(null)}
        onEdit={() => goToCardEditor(cSettingsOpen ?? '')}
        onDelete={() => onDelete('card', cSettingsOpen ?? '')}
      />

      <ActionsDialog
        open={!!bSettingsOpen}
        onOpenChange={() => setBSettingsOpen(null)}
        onEdit={() => goToAccountEditor(bSettingsOpen ?? '')}
        onDelete={() => onDelete('account', bSettingsOpen ?? '')}
      />
    </>
  );
}
