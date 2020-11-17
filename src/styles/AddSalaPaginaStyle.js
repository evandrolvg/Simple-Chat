import { StyleSheet } from "react-native";

export default StyleSheet.create({
  	container: {
		flex: 1,
		backgroundColor: "#88cbf0",
	},
	mt: {
		marginTop: 20,
	},
	loading: {
		padding: 20,
	},

	logo: {
		// aspectRatio: 1,
		width: 150,
		height: 150,
		resizeMode: "contain",
	},
	logoView: {
		marginTop: 15,
		justifyContent: "center",
		alignItems: "center",
	},

	input: {
		height: 48,
		borderRadius: 5,
		overflow: "hidden",
		backgroundColor: "white",
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 30,
		marginRight: 30,
		paddingLeft: 16,
	},
	button: {
		backgroundColor: "#263A44",
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		height: 48,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},

	footerView: {
		flex: 1,
		alignItems: "center",
		marginTop: 20,
	},
	footerText: {
		fontSize: 16,
		color: "#2e2e2d",
	},
});
