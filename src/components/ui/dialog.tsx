import { Animated, Modal, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useEffect, useRef, useState } from 'react';
import { screenHeight } from '@/lib/utils/device';

export type DialogProps = {
  open: boolean;
  onOpenChange: () => void;
};

const styles = StyleSheet.create(theme => ({
  modal: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors['black-opacity'],
  },
  modalContainer: {
    backgroundColor: theme.colors['gray-900'],
    width: '100%',
    borderTopStartRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
    zIndex: 1,
  },
  btn: {
    marginTop: 32,
  },
  placeholder: { marginTop: 32 },
  btn_container: { height: 48 },
  sheetContainer: {
    marginTop: -8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sheet: {
    width: 32,
    height: 4,
    backgroundColor: theme.colors['gray-300'],
    borderRadius: 8,
    alignSelf: 'center',
  },
}));

export function Dialog({
  open,
  children,
  onOpenChange,
}: React.PropsWithChildren<DialogProps>) {
  const [dialogHeight, setDialogHeight] = useState(0);
  const transformValue = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(transformValue, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [open, transformValue, backdropOpacity]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(transformValue, {
        toValue: dialogHeight,
        useNativeDriver: true,
        duration: 300,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) onOpenChange();
    });
  };

  return (
    <Modal visible={open} animationType="none" transparent>
      <View style={styles.modal}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.backdrop, { opacity: backdropOpacity }]}
          onPress={handleClose}
        />
        <Animated.View
          onLayout={e => setDialogHeight(e.nativeEvent.layout.height)}
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: transformValue }],
            },
          ]}
        >
          <View style={styles.sheetContainer}>
            <View style={styles.sheet} />
          </View>
          {children}
          <View style={styles.placeholder} />
        </Animated.View>
      </View>
    </Modal>
  );
}
