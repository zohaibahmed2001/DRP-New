import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Typography from './Typography';
import { COLORS } from '../globalStyle/Theme';

const Paragraph = ({ text, numberOfLines = 5 }) => {
  const [showAll, setShowAll] = useState(false);

  const estimatedCharPerLine = 65;
  const maxChar = numberOfLines * estimatedCharPerLine;

  const shouldTruncate = text.length > maxChar;
  const visibleText =
    showAll || !shouldTruncate ? text : text.slice(0, maxChar).trim() + '...';

  return (
    <Typography size={12}>
      {visibleText}
      {shouldTruncate && (
        <Typography
          color={COLORS.secondary}
          onPress={() => setShowAll(!showAll)}
          size={12}
        >
          {showAll ? ' See Less' : ' See More'}
        </Typography>
      )}
    </Typography>
  );
};

export default Paragraph;
