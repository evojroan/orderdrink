export default function Result({ toResult }) {
  return (
    <div className='row justify-content-center'>
      <div className='col-8'>
        <div className='card'>
          <div className='card-body'>
            <div className='card-title'>
              <h5>訂單</h5>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>品項</th>
                    <th scope='col'>數量</th>
                    <th scope='col'>小計</th>
                  </tr>
                </thead>
                <tbody>
                  {toResult
                    ? toResult.selected.map(item => {
                        return (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.subtotal}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
              <div className='text-end'>
                備註: <span>{toResult.note}</span>
              </div>
              <div className='text-end'>
                <h5>
                  總計: <span>${toResult.total ? toResult.total : 0}</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
