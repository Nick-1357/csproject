<template>
  <div>
    <employees v-if="$route.params.feature == 'employees'" />
    <saas-clients v-else-if="$route.params.feature == 'saas_clients'" />
    <company v-else-if="$route.params.feature == 'company'" />
    <roles v-else-if="$route.params.feature == 'roles'" />
    <policies v-else-if="$route.params.feature == 'policies'" />
    <profile v-else-if="$route.params.feature == 'profile'"/>
     <my-clients v-else-if="$route.params.feature == 'my_clients'"/>
  </div>
</template>

<script>
/* eslint-disable */
import Employees from "./EmployeesTable.vue";
import SaasClients from "./SaaSClientsTable.vue";
import Company from "./CompaniesTable.vue";
import Roles from "./RolesTable.vue"
import Policies from "./PoliciesTable.vue"
import Profile from "./Profile.vue"
import myClients from "./myClientsTable.vue"
export default {
  name: "Settings",
  components: {
    Employees,
    SaasClients,
    Company,
    Roles,
    Policies,
    Profile,
    myClients
  },
};
</script>
