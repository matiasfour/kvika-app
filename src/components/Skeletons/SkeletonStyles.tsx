import { Colors } from '@kvika/theme';
import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    width: '100%',
    padding: 16,
  },
  flexContainerWithBackground: {
    display: 'flex',
    width: '100%',
    padding: 16,
    backgroundColor: Colors.black7,
  },
  flexStartRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 4,
    marginBottom: 24,
    backgroundColor: Colors.black7,
  },
  spaceBetweenRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
    backgroundColor: Colors.black7,
  },
  centerRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
    backgroundColor: Colors.black7,
  },
});
