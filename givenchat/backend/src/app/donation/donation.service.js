const CampaignModel = require("../campaign/campaign.model");
const DonationModel = require("./donation.model");
const request = require("request-promise");

class DonationService {
  async createDonation(req) {
    console.log("req body in game plan service", req.body);

    let newDonation;
    newDonation = new DonationModel({
      donationAmount: req.body.donationAmount,
      campaignId: req.body.campaignId,
      donorId: req.authUser._id,
      status: "PENDING",
    });

    const campaign = await CampaignModel.findById(req.body.campaignId);

    try {
      const result = await newDonation.save();
      console.log("donation before khalti initiate", result);
      const options = {
        method: "POST",
        url: "https://a.khalti.com/api/v2/epayment/initiate/",
        headers: {
          Authorization: "key live_secret_key_68791341fdd94846a146f0457ff7b455",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          return_url: "http://localhost:8001/api/v1/donation/payment-callback/",
          website_url:
            "http://localhost:3000",
          amount: "1000",
          purchase_order_id: result._id,
          purchase_order_name: "test",
          customer_info: {
            name: "Ram Bahadur",
            email: "test@khalti.com",
            phone: "9800000001",
          },
        }),
      };
      // {"pidx":"9uhFUpUwEZbkRU5gHPdE7f","payment_url":"https://test-pay.khalti.com/?pidx=9uhFUpUwEZbkRU5gHPdE7f","expires_at":"2024-07-08T12:36:49.324207+05:45","expires_in":1800,"user_fee":100} body
      // request(options,async function (error, response) {
      //   if (error) throw new Error(error);
      //   const axiosResponse = await response;
      //   const resultForFrontend = {
      //     responseFromKhalti: response.body,
      //     campaignId: req.campaignId,
      //     donationAmount: req.donationAmount,
      //   };
      //   return resultForFrontend;
      // });
      const response = await request(options);
      const responseObj =await  JSON.parse(response);
      console.log("responseObj", responseObj);

      console.log("response pidx from khalti", responseObj["pidx"]);

        const updatedDonation = await DonationModel.findByIdAndUpdate(
          result._id,
          { $set: {
            pidx:responseObj["pidx"]
          } },
          {
            new: true, // Return the updated document
            runValidators: true, // Run validation on the updated document
             // Omit undefined fields from the update
          }
        );
        console.log("updated daonation", updatedDonation);

      const resultForFrontend = {
        responseFromKhalti: response,
        campaign:campaign,
        donationAmount: req.body.donationAmount,
      };
      return resultForFrontend;
    } catch (exception) {
      console.log("exception", exception);
      throw exception;
    }
  }

  async handlePayment(req){
     const query = req.query;
    console.log("query", query);
     // Get specific values
     const pidx = query.pidx;

     const transactionId = query.transaction_id;
     const amount = query.amount;
     const status = query.status;

       if(status==="Completed"){
        const updatedDonation = await DonationModel.findOneAndUpdate(
          { pidx: pidx }, // Filter criteria
          { $set: { transactionId: transactionId, status: "COMPLETED" } }, // Update operation
          { new: true } // Options: `new: true` returns the updated document
        );
          return updatedDonation;
       }else{
        return "donation failed"
       }

     
  }

  listAllCampaigns = async (filter = {}, paging = { skip: 0, limit: 8 }) => {
    try {
      const campaigns = await CampaignModel.find().populate("campaigner_id");
      console.log("campaigns", campaigns);
      return campaigns;
    } catch (exception) {
      throw exception;
    }
  };
  deleteGamePlan = async (req) => {
    const filter = { _id: req.params.id };
    try {
      const res = await GamePlanModel.deleteOne(filter);
      console.log("response of delete", res, filter, res.deletedCount);
      return res;
    } catch (exception) {
      throw exception;
    }
  };
}

const donationSvc = new DonationService();
module.exports = donationSvc;
