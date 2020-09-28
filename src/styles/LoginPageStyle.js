import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: "center",
		paddingLeft: 15,
		paddingRight: 15,
	},
	// input: {
	// 	paddingLeft: 5,
	// 	paddingRight: 5,
	// },
	btn: {
		paddingTop: 20,
		fontSize: 11,
	},

	loading: {
		padding: 20,
	},

	logo: {
		flex: 1,
		height: 120,
		width: 90,
		alignSelf: "center",
		margin: 30,
		aspectRatio: 1,
		resizeMode: "center",
	},

	input: {
		height: 48,
		borderRadius: 5,
		overflow: "hidden",
		backgroundColor: "white",
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 30,
		marginRight: 30,
		paddingLeft: 16,
	},
	button: {
		// backgroundColor: "#788eec",
		marginLeft: 30,
		marginRight: 30,
		marginTop: 30,
		height: 40,
		borderRadius: 18,
		// alignItems: "center",
		// justifyContent: "center",
		
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
	footerLink: {
		color: "#788eec",
		fontWeight: "bold",
		fontSize: 16,
	},
});
