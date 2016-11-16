<div class="row">
    <div class="col-md-7 form-inline">
        <div class="form-inline form-group">
          <label>Search:</label>
          <input v-model="searchFor" class="form-control" @keyup.enter="setFilter">
          <button class="btn btn-primary" @click="setFilter">Go</button>
          <button class="btn btn-default" @click="resetFilter">Reset</button>
      </div>
  </div>
  <div class="col-md-5">
    <div class="form-inline form-group pull-right">
        <button class="btn btn-default" data-toggle="modal" data-target="#settingsModal">
            <span class="glyphicon glyphicon-cog"></span> Settings
        </button>
    </div>
</div>
</div>