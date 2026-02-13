import Toast, { ToastType } from 'react-native-toast-message';

type CustomToastType = {
  type?: ToastType;
  title: string;
  description: string;
};

const CustomToast = ({ type = "success", title, description }: CustomToastType) => {
  Toast.show({
    type,
    text1: title,
    text2: description,
  });
};

export default CustomToast;
