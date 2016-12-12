<div v-if="flashMessage" class="alert alert-@{{ flashType }}">
	<b>@{{ flashMessage }}</b>
	<ul class="list-group" v-if="errorMessages">
	  <li class="list-group-item" v-for="error in errorMessages">@{{ error }}</li>
	</ul>
	<hr v-if="$validation.errors">
	<validator-errors :component="'custom-error'" :validation="$validation"></validator-errors>
</div>
