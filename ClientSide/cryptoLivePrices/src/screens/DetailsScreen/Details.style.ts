import { StyleSheet } from 'react-native';
import { colors } from '../../utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.dark,
    height: 100,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 24,
    color: colors.light,
  },
  symbol: {
    fontSize: 15,
    backgroundColor: colors.primary,
    padding: 5,
    color: colors.light,
  },
  price: {
    fontSize: 24,
    width: 150,
    textAlign: 'right',
    color: colors.secondary,
  },
  headerTagLine: {
    marginTop: 10,
  },
  line: {
    color: colors.light,
    fontSize: 14,
  },
  priceChanges: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    height: 70,
  },
  priceChangeRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cryptoInfo: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    flex: 1,
  },
  cryptoInfoTitle: {
    color: colors.secondary,
    marginBottom: 5,
    fontSize: 22,
  },
  cryptoInfoRow: {
    flex: 1,
    marginBottom: 25,
  },
});
