import { floorsNRooms } from '../../components/Report/_pages/_props/floorsNRooms'

export function getFloorData (floorKey) {
	const [floor] = floorsNRooms.filter(({key}) => key === floorKey)

	return floor
}

export function getRoomData (floorKey, roomKey) {
	const {rooms} = getFloorData(floorKey)
	const [room] = rooms.filter(({key}) => key === roomKey)

	return room
}