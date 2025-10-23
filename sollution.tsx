🧩 Step 1: Modify CountryRestrictions.tsx

We’ll expose the inner form instance to parent (Formily), so handleFormSubmit can trigger its validation.

At the top of CountryRestrictions.tsx, modify the component signature:

import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";


Then update your component to this (only key additions shown 👇):

const CountryRestrictions: React.FC<{ schema: any; onFormRef?: (form: any) => void }> = 
({ schema, onFormRef }) => {
  const [form] = Form.useForm();

  // 👇 expose form instance upward
  useEffect(() => {
    if (onFormRef) onFormRef(form);
  }, [form]);

  ...
};


Now the parent (FormRendererWrapper) can trigger validation for this child form.

🧩 Step 2: Update the wrapper CountryRestrictions Formily integration file

In your CustomCountryRestrictions wrapper (where you’re connecting this to Formily):

Replace this block ⬇️

const CustomCountryRestrictions = () => (
  <CountryRestrictions schema={schema} />
);


with this:

let countryFormRef: any = null;

const CustomCountryRestrictions = () => (
  <CountryRestrictions
    schema={schema}
    onFormRef={(formInstance) => (countryFormRef = formInstance)}
  />
);


and export that ref via window (temporary bridge between Formily and normal Ant Form):

window.countryFormRef = countryFormRef;

🧩 Step 3: Modify handleFormSubmit inside FormRendererWrapper.tsx

Before submitting the Formily form, trigger validation for CountryRestrictions form:

Find:

const values = form.getFormState().values;
console.log("values", values);
try {
  let values;
  if (status == "draft") {
    values = form.values as any;
  } else {
    values = (await form.submit()) as any;
  }


⬇️ Replace that with:

const values = form.getFormState().values;
console.log("values", values);

try {
  // ✅ Validate CountryRestrictions form first
  if (window.countryFormRef) {
    try {
      await window.countryFormRef.validateFields(); // shows inline Antd error messages
    } catch (err) {
      message.error({
        content: "Please fill all required Country Restriction fields.",
        style: { textAlign: "right" },
      });
      return; // stop submit
    }
  }

  let values;
  if (status == "draft") {
    values = form.values as any;
  } else {
    values = (await form.submit()) as any;
  }

✅ What happens now:

When you click Submit, it will first validate the CountryRestrictions form (the Ant Design <Form> inside it).

If any required fields (country, embargoed, sanctioned, humanRights) are missing:

Ant Design shows inline error messages below those fields (as per the existing rules array in your Form.Items).

Submission halts (thanks to the return).

⚙️ Result

✅ Inline red validation messages appear directly under CountryRestrictions fields.
✅ No structure change to Formily or wrapper components.
✅ Works seamlessly with your handleFormSubmit button click.

Would you like me to make this change using forwardRef instead of a global window.countryFormRef (for a more React-clean approach)?
It’s a 2-line improvement, but I kept this version simple and non-breaking.
