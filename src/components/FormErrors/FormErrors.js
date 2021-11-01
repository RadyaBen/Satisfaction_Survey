import React from 'react';

const FormErrors = ({ formErrors }) =>

	<div className='form-errors'>
		{Object.keys(formErrors).map((fieldName, i) => formErrors[fieldName].length > 0 ? (<div key={i}>{fieldName} {formErrors[fieldName]}</div>) : null)}
	</div>

export default FormErrors;