import { StyleSheet } from "react-native";

export default StyleSheet.create({
	options: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white"
	},

	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	sendingContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: 50,
		paddingBottom:0,
		marginBottom:-8,
	},
	bottomComponentContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	systemMessageWrapper: {
		backgroundColor: "#6646ee",
		borderRadius: 4,
		padding: 5,
	},
	systemMessageText: {
		fontSize: 14,
		color: "#fff",
		fontWeight: "bold",
	},
});

