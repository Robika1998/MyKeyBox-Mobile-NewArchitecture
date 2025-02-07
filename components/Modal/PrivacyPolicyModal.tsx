import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
} from "react-native";

interface AccountSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AccountSettings({
  isVisible,
  onClose,
}: AccountSettingsModalProps) {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Privacy Policy</Text>
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.text}>Last updated: June 03, 2024</Text>
            <Text style={styles.text}>
              This Privacy Policy describes Our policies and procedures on the
              collection, use, and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </Text>
            <Text style={styles.text}>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy.
            </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.termsfeed.com/privacy-policy-generator/"
                )
              }
            >
              <Text style={styles.link}>Privacy Policy Generator</Text>
            </TouchableOpacity>
            <Text style={styles.subHeader}>Interpretation and Definitions</Text>
            <Text style={styles.subSubHeader}>Interpretation</Text>
            <Text style={styles.text}>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </Text>
            <Text style={styles.subSubHeader}>Definitions</Text>
            <Text style={styles.text}>
              For the purposes of this Privacy Policy:
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Account:</Text> A unique account created
              for You to access our Service.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Affiliate:</Text> An entity that
              controls, is controlled by, or is under common control with a
              party.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Application:</Text> Refers to
              MyKeyBox.com, the software program provided by the Company.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Company:</Text> MyKeyBox LLC, 7565
              Haverhill Ln, Maineville, Ohio.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Country:</Text> Ohio, United States.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Device:</Text> Any device that can
              access the Service such as a computer, cellphone, or tablet.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Personal Data:</Text> Any information
              that relates to an identified or identifiable individual.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Service:</Text> Refers to the
              Application.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Service Provider:</Text> A natural or
              legal person processing data on behalf of the Company.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Usage Data:</Text> Data collected
              automatically from the Service infrastructure itself.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>You:</Text> The individual using the
              Service.
            </Text>
            <Text style={styles.subHeader}>
              Collecting and Using Your Personal Data
            </Text>
            <Text style={styles.subSubHeader}>Types of Data Collected</Text>
            <Text style={styles.subSubHeader}>Personal Data</Text>
            <Text style={styles.text}>
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information, including:
            </Text>
            <Text style={styles.listItem}>- Email address</Text>
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    height: "100%",
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  contentContainer: {
    maxHeight: "85%",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#444",
    lineHeight: 22,
  },
  link: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    color: "#222",
  },
  subSubHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#444",
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
    color: "#555",
  },
  bold: {
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
