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
		width: 200,
		height: 200,
		resizeMode: "contain",
		borderRadius: 100,
	},
	logoView: {
		marginTop: 10,
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
		backgroundColor: "#005cc5",
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
		marginTop: 20,
		fontSize: 16,
		color: "#2e2e2d",
	},
	link: {
		fontSize: 16,
		color: "#005cc5",
	}
});
