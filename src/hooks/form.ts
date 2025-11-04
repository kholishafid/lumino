import { createFormHook } from '@tanstack/react-form'

import {
  FormErrorMessage,
  Select,
  SubscribeButton,
  TextArea,
  TextField,
} from '../components/form-components'
import { fieldContext, formContext } from './form-context'

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
  },
  formComponents: {
    SubscribeButton,
    FormErrorMessage,
  },
  fieldContext,
  formContext,
})
