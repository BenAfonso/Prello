import {addNotification} from '../store/actions'

export function displayNotification (notification) {
  addNotification(notification)
}
