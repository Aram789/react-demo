
import './App.css';
//import User from "./components/User";
import Product from "./components/Product";
import Input from "./components/input/Input";
function App() {
  return (
    <div className="App">
        <Input/>
      {/*<User name={'valod'} age={18} href={'fffff'}/>*/}
      {/*<User name={'aaa'} age={28}/>*/}
        <Product name={'valod'} age={18} price={'1$'}/>
        <Product name={'poxos'} age={8}/>
    </div>
  );
}


export default App;
