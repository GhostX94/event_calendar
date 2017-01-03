<div class="row">
	<div class="col-sm-12">
		<validator name="validation">
			<form class="" enctype="multipart/form-data" novalidate>
				{{--<meta id="_token" value="{{ csrf_token() }}">--}}
				<!-- Name Field -->
				<div class="form-group col-sm-6">
					<label for="name">Name:</label>
					<input type="text" class="form-control" v-model="row.name" v-validate:name="{ required: true, minlength: 1, maxlength: 255}" data-type="text" />
					<div v-if="$validation.name.invalid" class="alert alert-danger" role="alert">
						<div v-if="$validation.name.required">
							<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							<span class="sr-only">Error:</span>
							Custom rule(required) Message Here
						</div>
						<div v-if="$validation.name.minlength">
							<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							<span class="sr-only">Error:</span>
							Custom rule(minlength) Message Here
						</div>
						<div v-if="$validation.name.maxlength">
							<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							<span class="sr-only">Error:</span>
							Custom rule(maxlength) Message Here
						</div>

					</div>
				</div>
				<div class="form-group col-sm-6">
				    <label for="school_level_id">School level:</label>
				    <div class="input-group">
						<select class="form-control" v-model="row.school_level_id" v-validate:school_level_id="{ required: true }">
							<option value="" selected="selected">-- Select level --</option>
							<option v-for="(id, name) in foreignData.schoolLevelOptions" v-bind:value="id">		
								@{{ name }}
							</option>
						</select>
						<span class="input-group-btn">
	    					<button class="btn btn-primary" @click="modal('schoolLevel_ADD_inform')">
	    						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
    						</button>
	  					</span>
  					</div>
				    <div v-if="$validation.school_level_id.invalid" class="alert alert-danger" role="alert">
						<div v-if="$validation.school_level_id.required"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							<span class="sr-only">Error:</span>
							La familia es obligatoria
						</div>
					</div> 
				</div>
				<div class="form-group col-sm-6">
					<div v-if="!file">
						<h2>Select an image</h2>
						<input type="file" @change="onFileChange">
					</div>
					<div v-else>
						<img :src="file" />
						<button @click="removeImage">Remove image</button>
					</div>
				</div>
			</form>
		</validator>
	</div>
</div>


