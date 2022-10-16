// variables found in react props hotelDetails, index, endIndex,flight,sortedFlightDetails, idealLocation, lodgingPrice

const populateHotel = async (values) => {
	let isNewHotel = false;
	let currentHotel = hotelDetails.find((item) => item.flightIndex === index);
	const prevHotel = hotelDetails.find((item) => item.flightIndex === index - 1);
	const isEndIndex = index === endIndex;
	const updatedFlight = {
		...flight,
		...values,
	};
	const isClosed =
		isEndIndex &&
		sortedFlightDetails[0].departure === updatedFlight.destination;

	const city = updatedFlight.hotelItem;
	const suggestedDate =
		updatedFlight && updatedFlight.departureDate
			? returnTrueDate(updatedFlight.departureDate)
			: '';

	const formattedDate =
		updatedFlight && updatedFlight.departureDate
			? moment(updatedFlight.departureDate).format().slice(0, 10)
			: '';

	isNewHotel = !currentHotel;
	currentHotel = currentHotel
		? currentHotel
		: {
				flightIndex: index,
				radius: idealLocation >= 0 ? idealLocation : '',
				priceRange: lodgingPrice || '',
				rooms: 1,
		  };

	if (prevHotel) {
		prevHotel.endDate = formattedDate;
		prevHotel.suggestedEndDate = suggestedDate;
	}
	if (currentHotel) {
		currentHotel.startDate = formattedDate;
		currentHotel.suggestedStartDate = suggestedDate;
		currentHotel.city = city;
	}
	if (!isClosed) {
		prevHotel && (await editSuggestedHotel(prevHotel));
		!isNewHotel
			? await editSuggestedHotel(currentHotel)
			: await addSuggestedHotel(currentHotel);
	} else {
		prevHotel && editSuggestedHotel(prevHotel);
	}

	// Previous code

	// if (
	// 	currentHotel &&
	// 	updatedFlight.destination &&
	// 	updatedFlight.departureDate
	// ) {
	// 	let updatedHotel = {
	// 		...currentHotel,
	// 		city,
	// 		startDate: moment(updatedFlight.departureDate).format().slice(0, 10),
	// 		suggestedStartDate: returnTrueDate(updatedFlight.departureDate),
	// 		flightIndex: index,
	// 	};
	// 	if (index > 0 && index < endIndex) {
	// 		updatedHotel = {
	// 			...currentHotel,
	// 			city,
	// 			suggestedStartDate: returnTrueDate(updatedFlight.departureDate),
	// 			startDate: moment(updatedFlight.departureDate).format().slice(0, 10),
	// 		};
	// 		prevUpdated = {
	// 			...prevHotel,
	// 			suggestedEndDate: returnTrueDate(updatedFlight.departureDate),
	// 			endDate: moment(updatedFlight.departureDate).format().slice(0, 10),
	// 			flightIndex: index - 1,
	// 		};
	// 	} else if (index === endIndex) {
	// 		prevUpdated = {
	// 			...prevHotel,
	// 			suggestedEndDate: returnTrueDate(updatedFlight.departureDate),
	// 			endDate: moment(updatedFlight.departureDate).format().slice(0, 10),
	// 			flightIndex: index - 1,
	// 		};
	// 	} else
	// 		updatedHotel = {
	// 			...currentHotel,
	// 			city,
	// 			suggestedStartDate: returnTrueDate(updatedFlight.departureDate),
	// 			startDate: moment(updatedFlight.departureDate).format().slice(0, 10),
	// 			flightIndex: index,
	// 		};

	// 	await handleEdit(currentHotel, updatedHotel);
	// 	if (typeof prevUpdated !== 'undefined')
	// 		await handleEdit(prevHotel, prevUpdated);
	// }
	// if (
	// 	typeof currentHotel === 'undefined' &&
	// 	hotelDetails.length < 6 &&
	// 	updatedFlight.destination &&
	// 	updatedFlight.departureDate
	// ) {
	// 	await addSuggestedHotel({
	// 		city: returnAirportCityData(updatedFlight),
	// 		startDate: moment(updatedFlight.departureDate).format().slice(0, 10),

	// 		suggestedStartDate: returnTrueDate(updatedFlight.departureDate),
	// 		suggestedEndDate: '',
	// 		endDate: '',
	// 		radius: idealLocation >= 0 ? idealLocation : '',
	// 		priceRange: lodgingPrice || '',
	// 		flightIndex: index,
	// 		rooms: 1,
	// 	});
	// }
};
