function InputTextArea({ name, onHandleEnterPress }) {
  return (
    <>
      <textarea
        name={name}
        onKeyDown={onHandleEnterPress}
        className="step-textarea"
        placeholder="the first step here....."
      ></textarea>
    </>
  );
}

export default InputTextArea;