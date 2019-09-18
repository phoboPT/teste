import UpdateSupplier from '../components/UpdateSupplier';

const updateItem = props => (
  <div>
    <UpdateSupplier id={props.query.id}></UpdateSupplier>
  </div>
);

export default updateItem;
