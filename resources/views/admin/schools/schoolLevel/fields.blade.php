<validator name="validationSchool_level">			
	<!-- Name Field -->
	<div class="form-group col-sm-6">
	    <label for="name">Name:</label>
	    <input type="text" class="form-control" v-model="row.school_level.name" v-validate:name="{ required: true, minlength: 1, maxlength: 255{{-- , unique: providers --}} }" data-type="text" />
	    <div v-if="$validationSchool_level.name.invalid" class="alert alert-danger" role="alert">
				<div v-if="$validationSchool_level.name.required">
				<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				<span class="sr-only">Error:</span>
				Custom rule(required) Message Here
			</div>
			<div v-if="$validationSchool_level.name.minlength">
				<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				<span class="sr-only">Error:</span>
				Custom rule(minlength) Message Here
			</div>
			<div v-if="$validationSchool_level.name.maxlength">
				<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				<span class="sr-only">Error:</span>
				Custom rule(maxlength) Message Here
			</div>
		</div>
	</div>	
</validator>