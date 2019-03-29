<template lang="pug">
section
  h2.ui.dividing.header Toasts

  button.ui.left.labeled.icon.blue.button(@click="$toastr.info('This is an informative toast.')")
    i.fas.fa-info-circle.icon
    | Info

  button.ui.left.labeled.icon.positive.button(@click="$toastr.success('Yay! Success!')")
    i.fas.fa-check-circle.icon
    | Success

  button.ui.left.labeled.icon.yellow.button(@click="$toastr.warning('Hey! Watch out!')")
    i.fas.fa-exclamation-circle.icon
    | Warning

  button.ui.left.labeled.icon.negative.button(@click="$toastr.error('There\\'s something really wrong here...')")
    i.fas.fa-exclamation-triangle.icon
    | Error
</template>
