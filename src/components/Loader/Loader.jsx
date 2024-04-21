import { Circles } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div>
      <Circles
        height="80"
        width="80"
        color="blue"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}