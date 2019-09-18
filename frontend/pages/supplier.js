import SingleSupplier from '../components/SingleSupplier';

const supplier = props => (
  <div>
    <SingleSupplier id={props.query.id}></SingleSupplier>
  </div>
);

export default supplier;
