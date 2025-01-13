interface confirmationModalProps {
  message: string;
  confirm: boolean;
}
export default confirmationModal = ({
  message,
  confirm,
}: confirmationModalProps) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={() => confirm(true)}>Yes</button>
      <button onClick={() => confirm(false)}>No</button>
    </div>
  );
};
