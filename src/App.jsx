import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState(""); //入力した文字列 input欄
  const [incompleteTodos, setIncompleteTodos] = useState([]); //未完了に文字列をセット
  const [completeTodos, setCompleteTodos] = useState([]); //完了に文字列をセット
  const onChangeTodoText = (event) => setTodoText(event.target.value); //入力した文字列を表示させる
  //追加ボタン押下時の動き
  const onClickAdd = () => {
    if (todoText === "") return; //文字が入っていない場合処理が起きない　処理が1行で終わるときは{}を省略できる
    const newTodos = [...incompleteTodos, todoText]; //...配列の結合をしてincompleteTodosと同じものが入る
    setIncompleteTodos(newTodos); //newTodosに入ったものがsetされる
    setTodoText(""); //入力後inputテキスト
  };
  //削除ボタン
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos); //newTodosに入ったものがsetされる
  };
  //完了ボタン
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  //戻すボタン
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos]; //今のcompleteTodosをコピーしてくる
    newCompleteTodos.splice(index, 1); //completeTodosから１つ削除

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]]; //未完了TODOに移す　今のincompleteTodosに今回押したcompleteTodosのindex番目を移す
    setCompleteTodos(newCompleteTodos); //setCompleteTodosを設定
    setIncompleteTodos(newIncompleteTodos); //setIncompleteTodosを設定
  };
  return (
    <>
      <div className="inner">
        <div className="input-area">
          <p className="title">追加</p>
          <input
            placeholder="追加する項目"
            value={todoText}
            onChange={onChangeTodoText}
          />
          <button onClick={onClickAdd}>追加</button>
        </div>
        <div className="incomplete-area">
          <p className="title">未完了TODO</p>
          <ul>
            {incompleteTodos.map((todo, index) => {
              return (
                <div key={todo} className="list-row">
                  <li>{todo}</li>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                  {/* 引数を渡したいときはアロー関数をつくる{() => onClickDelete(index)}こうしないとすべてを繰り返して読んでしまう */}
                </div>
              );
            })}
          </ul>
        </div>
        <div className="complete-area">
          <p className="title">完了したTODO</p>
          <ul>
            {completeTodos.map((todo, index) => {
              return (
                <div key={todo} className="list-row">
                  <li>{todo}</li>
                  <button onClick={() => onClickBack(index)}>戻す</button>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
