import RenderLayout from "./core/RenderLayout";
import { ToastContainer, toast } from "react-toastify";
export default function App() {
  return (
    <div>
      <ToastContainer autoClose={1200}></ToastContainer>
      <RenderLayout></RenderLayout>
    </div>
  );
}
