import { useCallback, useMemo } from 'react';
import { UseMaskedInputProps } from '../types/mask';
import formatWithMask from '../utils/mask';

export function useMaskedInput(props: UseMaskedInputProps) {
  const {
    value,
    mask,
    onChangeText,
    placeholderFillCharacter = '_',
    obfuscationCharacter,
    showObfuscatedValue,
    maskAutoComplete,
  } = props;

  const maskArray = useMemo(
    () => (typeof mask === 'function' ? mask(value) : mask),
    [mask, value],
  );

  const formattedValueResult = useMemo(() => {
    return formatWithMask({ text: value || '', mask, obfuscationCharacter });
  }, [mask, obfuscationCharacter, value]);

  const maskHasObfuscation = useMemo(
    () => maskArray && !!maskArray.find(maskItem => Array.isArray(maskItem)),
    [maskArray],
  );

  const isValueObfuscated = useMemo(
    () => !!maskHasObfuscation && !!showObfuscatedValue,
    [maskHasObfuscation, showObfuscatedValue],
  );

  const handleChangeText = useCallback(
    (text: string) => {
      let textToFormat = text;

      if (isValueObfuscated) {
        textToFormat = formattedValueResult.masked || '';

        if (textToFormat.length > text.length) {
          textToFormat = textToFormat.slice(0, -1);
        } else if (textToFormat.length < text.length) {
          textToFormat = textToFormat + text[text.length - 1];
        }
      }

      const result = formatWithMask({
        text: textToFormat,
        mask,
        obfuscationCharacter,
        maskAutoComplete:
          maskAutoComplete &&
          textToFormat.length > formattedValueResult.masked.length,
      });

      onChangeText &&
        onChangeText(result.masked, result.unmasked, result.obfuscated);
    },
    [
      isValueObfuscated,
      mask,
      obfuscationCharacter,
      onChangeText,
      formattedValueResult.masked,
      maskAutoComplete,
    ],
  );

  const defaultPlaceholder = useMemo(() => {
    if (maskArray) {
      return maskArray
        .map(maskChar => {
          if (typeof maskChar === 'string') {
            return maskChar;
          } else {
            return placeholderFillCharacter;
          }
        })
        .join('');
    } else {
      return undefined;
    }
  }, [maskArray, placeholderFillCharacter]);

  const inputValue = isValueObfuscated
    ? formattedValueResult.obfuscated
    : formattedValueResult.masked;

  return {
    onChangeText: handleChangeText,
    value: inputValue,
    selection: isValueObfuscated
      ? { start: inputValue.length, end: inputValue.length }
      : undefined,
    placeholder: defaultPlaceholder,
  };
}
