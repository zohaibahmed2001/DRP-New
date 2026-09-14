import {Image} from 'react-native';
import {Flex, Typography} from '../../atomComponents';
import Sizer from '../../helpers/Sizer';
import {COLORS} from '../../globalStyle/Theme';

export const SubTitle = ({
  mTitle = 'NA',
  sTitle,
  img = '',
  onSeeAllPress,
  isSeeAllTextVisible = false,
}) => {
  return (
    <Flex jusContent={'space-between'} mT={30} algItems={'center'}>
      <Flex algItems={'center'}>
        <Typography
          size={22}
          color={COLORS.white100}
          fFamily={'poppinsSemiBold600'}>
          {mTitle}{' '}
        </Typography>
      </Flex>
      {isSeeAllTextVisible && (
        <Typography
          size={18}
          color={COLORS.secondary}
          fFamily={'poppinsSemiBold600'}
          onPress={onSeeAllPress}>
          See All
        </Typography>
      )}
    </Flex>
  );
};
