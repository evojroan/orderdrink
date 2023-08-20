import 'bootstrap/scss/bootstrap.scss';

export default function Menu({ data, handleSelect }) {
  return (
    <div className='col-md-4'>
      <div className='list-group'>
        {data.map(item => {
          return (
            <a
              href='#'
              className='list-group-item list-group-item-action'
              key={item.id}
              onClick={event => {
                // 使用 event 作為參數，避免覆蓋外部的 item
                event.preventDefault(); // 防止頁面刷新
                handleSelect(item.id);
              }}>
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='mb-1'>{item.name}</h5>
                <small>${item.price}</small>
              </div>
              <p className='mb-1'>{item.description}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
