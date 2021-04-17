import React from 'react';
import {Container, Tab, Tabs} from 'native-base';
import ProductListScreen2 from './ProductsList2';
const TabScreen = props => {
  const {subcategories} = props;
  console.log(subcategories);
  return (
    <Container>
      <Tabs>
        {subcategories.map(s => (
          <Tab heading={s.category_name}>
            <ProductListScreen2 id={s.category_id} name={s.category_name} />
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default TabScreen;
