import styled from '@emotion/styled';

const Wrap = styled.ul`
  > li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
    > .color-box {
      width: 50px;
      height: 50px;
      margin-right: 8px;
    }
  }
`;

export type ColorItem = [string, number];

interface Props {
  list: ColorItem[]
}

export const ColorList = (props: Props) => {
  const { list } = props;
  return (
    <Wrap>
      {
        list.map((item, index) => {
          const [colorCode, count] = item;
          return (
            <li key={`${colorCode}-${index}`}>
              <span className="color-box" style={{ backgroundColor: colorCode }} />
              <p>{count}</p>
            </li>
          )
        })
      }
    </Wrap>
  );
}