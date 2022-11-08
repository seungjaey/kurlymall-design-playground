import { ChakraProvider, Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, AccordionIcon } from '@chakra-ui/react';
import { pipe, entries, map, toArray, filter, first, last, sortBy, reverse, isEmpty } from '@fxts/core';

import MERGED from '../../assets/MERGED.json'

import { ColorList, ColorItem } from '../ColorList';

type MergedItem = [string, { colors: { [key: string]: number }; child: [string]}];
type MergedData = [MergedItem];

const PAGE_SOURCE_KEY_LIST = pipe(
  MERGED as MergedData,
  filter(args => {
    const [, data] = args;
    // @ts-ignore
    const { colors } = data;
    return !isEmpty(colors);
  }),
  // @ts-ignore
  map(args => first(args) as string),
  toArray,
) as string[];

export const PageList = () => {
  return (
    <ChakraProvider>
      <Accordion allowMultiple>
        {
          PAGE_SOURCE_KEY_LIST.map((pageKey, index) => {
            const [, data] = (MERGED as MergedData)[index] as MergedItem;
            const { colors } = data
            const colorFreqList = pipe(
              entries(colors),
              sortBy(a => last(a)),
              reverse,
              toArray,
            )
            // [[colorKey, freq] ...]
            // console.log(colorFreqList)
            return (
              <AccordionItem key={pageKey}>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {pageKey}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ColorList list={colorFreqList as ColorItem[]} />
                </AccordionPanel>
              </AccordionItem>
            )
          })
        }
      </Accordion>
    </ChakraProvider>
  );
};
