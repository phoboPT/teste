import UpdateProduct from '../components/UpdateProduct';

const updateItem = props => (
  <div>
    <UpdateProduct id={props.query.id}></UpdateProduct>
  </div>
);

export default updateItem;
