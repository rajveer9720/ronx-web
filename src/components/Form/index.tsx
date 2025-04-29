import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import { forwardRef, Ref } from "react";
import { IForm } from "../../interfaces/form";

interface FormProps {
  initialValues: any;
  validationSchema: any;
  inputFields: IForm[];
  onSubmit: (values: any) => void;
  formikRef?: Ref<FormikProps<any>>;
}

const Form = forwardRef<FormikProps<any> | null, FormProps>((props) => {
  const { formikRef, initialValues, validationSchema, inputFields, onSubmit } =
    props;

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Box gap={2} flexDirection="column" display="flex">
          <Grid container spacing={2}>
            {inputFields.map((field: IForm) => (
              <Grid key={field.name} size={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched[field.name] && errors[field.name])}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    required={field.required}
                    type={field.type}
                    name={field.name}
                    value={values[field.name]}
                    label={field.label}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ boxShadow: "none" }}
                    error={Boolean(touched[field.name] && errors[field.name])}
                  />
                  <FormHelperText>
                    {touched[field.name] && errors[field.name]
                      ? errors[field.name]
                      : ("" as any)}
                  </FormHelperText>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Formik>
  );
});

export default Form;
