import { StyleSheet } from 'react-native';
import { colors } from '../../utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.primary,
  },
  crypto: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: colors.dark,
    padding: 20,
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: colors.light,
    fontSize: 24,
  },
  price: {
    color: colors.secondary,
    fontSize: 28,
  },
});
