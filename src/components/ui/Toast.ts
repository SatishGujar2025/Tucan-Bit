import { Flip, toast } from 'react-toastify';
import type { ToastOptions, TypeOptions } from 'react-toastify';
import { COLORS } from '../../constants/theming';
import { ToastTypes } from '../../constants/strings';

type ToastMethod = Exclude<TypeOptions, 'default'>;

const typeToMethod: Record<ToastTypes, ToastMethod> = {
  [ToastTypes.ALERT]: 'warning',
  [ToastTypes.KYC]: 'warning',
  [ToastTypes.SUCCESS]: 'success',
  [ToastTypes.ERROR]: 'error',
  [ToastTypes.PROMOTION]: 'info',
  [ToastTypes.SYSTEM]: 'info',
  [ToastTypes.BONUS]: 'info',
  [ToastTypes.WELCOME]: 'info',
};

/**
 * CustomToast
 *
 * @param type      One of ToastTypes
 * @param message   The content displayed in the toast 
 * @param autoClose Time in ms before auto-close; defaults to 1500ms
 * @returns         React.ReactText (the toast ID)
 */
export const CustomToast = (
  type: ToastTypes,
  message: React.ReactNode,
  autoClose?: number
): React.ReactText => {
  const toastOptions: ToastOptions = {
    position:        'top-right',
    autoClose:       autoClose ?? 1500,
    hideProgressBar: true,
    closeOnClick:    true,
    pauseOnHover:    false,
    draggable:       true,
    progress:        undefined,
    theme:           'colored',
    transition:      Flip,
    // Add a gradient background for SUCCESS to highlight it
    ...(type === ToastTypes.SUCCESS && {
      style: {
        background: `linear-gradient(to right, ${COLORS.primary}, #B516FF)`,
        color:      '#000',
      },
    }),
  };

  const method: ToastMethod = typeToMethod[type] ?? 'info';
  return toast[method](message, toastOptions);
};
