import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#88cbf0",
	},
	imageBack:{
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
	mt: {
		marginTop: 40,
	},
	loading: {
		padding: 20,
	},

	logo: {
		// aspectRatio: 1,
		width: 200,
		height: 200,
		resizeMode: "contain",
	},
	logoView: {
		marginTop: 40,
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
	footerTextEsqueci: {
		paddingBottom: 10,
		fontSize: 16,
		color: "#2b4cc1",
	},
	footerText: {
		paddingBottom: 10,
		fontSize: 16,
		color: "#263A44",
	},
});
