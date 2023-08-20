import 'bootstrap/scss/bootstrap.scss';
import { useState } from 'react';
import Menu from './components/Menu';
import Order from './components/Order';
import Result from './components/Result';

const data = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60
  }
];

export default function App() {
  const [selected, setSelected] = useState([]); //所選品項
  const [note, setNote] = useState('無'); // 備註

  //總金額
  let total = 0;
  for (let i = 0; i < selected.length; i++) {
    total += selected[i].price * selected[i].amount;
  }

  //事件處理器：點擊菜單的品項，就會累積選取的品項
  function handleSelect(id) {
    const selectedItem = data.find(item => item.id === id); //找到 id 相符的品項
    const itemWithAmountSubTTL = {
      ...selectedItem,
      amount: 1,
      subtotal: selectedItem.price * 1
    }; //點選品項後新增屬性：amount 與小計
    if (!selected.some(item => item.id === id)) {
      setSelected(prevState => [...prevState, itemWithAmountSubTTL]);
    }
  }

  //事件處理器：刪除所選品項
  function handleDelete(id) {
    if (selected.some(item => item.id === id)) {
      setSelected(prevState => prevState.filter(item => item.id !== id));
    }
  }

  //事件處理器：修改品項數量
  function handleAmount(id, event) {
    const updatedItems = selected.map(item => {
      if (item.id == id) {
        const newAmount = parseInt(event.target.value);
        const newSubtotal = item.price * newAmount;

        return {
          ...item,
          amount: newAmount,
          subtotal: newSubtotal
        };
      }
      return item;
    });
    setSelected(updatedItems);
  }

  // 事件處理器：備註文字
  function handleNote(event) {
    setNote(event.target.value);
  }

  //收集所有要送出的資料
  const originalToResult = {
    selected: selected,
    total: total,
    note: note
  };
  const [toResult, setToResult] = useState('');

  //事件處理器：送出所有資料以下單
  function sendOrder() {
    setToResult(originalToResult);
  }

  return (
    <div id='root'>
      <div className='container mt-5'>
        <div className='row'>
          <Menu
            data={data}
            handleSelect={handleSelect}
          />
          <Order
            selectedItem={selected}
            handleDelete={handleDelete}
            handleAmount={handleAmount}
            total={total}
            handleNote={handleNote}
            sendOrder={sendOrder}
          />
        </div>
        <hr />
        <Result toResult={toResult} />
      </div>
    </div>
  );
}
