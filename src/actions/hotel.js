import { useMutation } from "@apollo/client";
import Notify from "../components/Notify"
import {
  HotelMangerAddService,
  HotelManagerDeleteService,
  HotelMangerUpdateHotelService,
  HotelMangerUploadHotelServiceImage,
  HotelMangerDeleteHotelImage,
  HotelManagerAddRoomCatagory,
  HotelManagerUpdateRoomCatagory,
  HotelManagerDeleteRoomType,
  HotelManagerUploadRoomTypeImage,
  HotelManagerDeleteRoomTypeImage,
  HotleManagerAddRoom,
  HotelManagerDeleteRoom,
  AddRoom,
  SellerAddRoomCatagory,
  AddRoomCatagory,
  AddService,
  SellerAddRoom,
  SellerAddService,
  SellerAddServiceToRoom,
  HotelManagerAddServiceToRoom,
  AddServiceToRoom,
  DeleteHotelImage,
  SellerDeleteHotelImage,
  HotelManagerDeleteHotelImage,
  DeleteHotelServiceImage,
  SellerDeleteHotelServiceImage,
  HoteleManagerDeleteHotelServiceImage,
  DeleteRoom,
  SellerDeleteRoom,
  SellerDeleteRoomType,
  DeleteRoomType,
  SellerDeleteRoomTypeImage,
  DeleteRoomTypeImage,
  SellerDeleteService,
  DeleteService,
  HotelImageUpload,
  HotelManagerHotelImageUpload,
  SellerHotelImageUpload,
  SellerUpdateHotelService,
  UpdateHotelService,
  UpdateRoomCatagory,
  SellerUpdateRoomCatagory,
  UpdateRoomInfo,
  SellerUpdateRoomInfo,
  HotelManagerUpdateRoomInfo,
  SellerUploadHotelServiceImage,
  UploadHotelServiceImage,
  UploadRoomTypeImage,
  SellerUploadRoomTypeImage,
} from "../graphql/hotel";
import { getCookie } from "./auth";

const HotelActivities = () => {
  const { NotifyMessage, notify, setNotify } = Notify();
  const [addService] = useMutation(AddService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({ message: data.addService.message, type: "success" }),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelMangerAddService
  const [hotelManagerAddService] = useMutation(HotelMangerAddService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.hotelManagerAddService.message,
        type: "success",
      }),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [sellerAddService] = useMutation(SellerAddService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerAddService.message,
        type: "success",
      }),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelMangerUploadHotelServiceImage
  const [hotelManagerHotelImageUpload] = useMutation(
    HotelMangerUploadHotelServiceImage,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: data.hotelManagerHotelServiceImageUpload.message,
          type: "success",
        }),
      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  //HotelManagerHotelImageUpload
    const [hotelManagerHotelImageUploadd] = useMutation(HotelManagerHotelImageUpload, {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: "Hotel image successfully added.",
          type: "success",
        }),
      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    });
  //SellerHotelImageUpload
  const [sellerHotelImageUpload] = useMutation(SellerHotelImageUpload, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerHotelImageUpload.message,
        type: "success",
      }),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [hotelImageUpload] = useMutation(HotelImageUpload, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.hotelImageUpload.message,
        type: "success",
      }),
    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelManagerUploadRoomTypeImage
  const [hotelManagerRoomTypeImageUpload] = useMutation(
    HotelManagerUploadRoomTypeImage,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: "Room catagory image successfully added.",
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  const [sellerRoomTypeImageUpload] = useMutation(SellerUploadRoomTypeImage, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerRoomTypeImageUpload.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [roomTypeImageUpload] = useMutation(UploadRoomTypeImage, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.roomTypeImageUpload.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [sellerHotelServiceImageUpload] = useMutation(
    SellerUploadHotelServiceImage,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: data.sellerHotelServiceImageUpload.message,
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  const [hotelServiceImageUpload] = useMutation(UploadHotelServiceImage, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.hotelServiceImageUpload.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });

  const [deleteService] = useMutation(DeleteService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.deleteService.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelManagerDeleteService
  const [hotelManagerDeleteService] = useMutation(HotelManagerDeleteService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: "Service deleted successfully",
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [sellerDeleteService] = useMutation(SellerDeleteService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerDeleteService.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelMangerDeleteHotelImage
  const [hotelManagerDeleteHotelImages] = useMutation(
    HotelMangerDeleteHotelImage,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: data.hotelMangerDeleteHotelImages.message,
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
   const [hotelHotelDeleteHotelImages] = useMutation(HotelManagerAddServiceToRoom, {
     context: {
       headers: {
         Authorization: `Bearer ${getCookie("token")}`,
       },
     },
     onCompleted: (data) =>
       NotifyMessage({
         message: data.sellerDeleteHotelImages.message,
         type: "success",
       }),

     onError: (error) =>
       NotifyMessage({ message: error.message, type: "error" }),
   });
  //SellerDeleteHotelImage
  const [sellerDeleteHotelImages] = useMutation(SellerDeleteHotelImage, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerDeleteHotelImages.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [deleteHotelImages] = useMutation(DeleteHotelImage, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.deleteHotelImages.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [deleteHotelServiceImages] = useMutation(DeleteHotelServiceImage, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.deleteHotelServiceimage.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HoteleManagerDeleteHotelServiceImage
  const [hotelManagerDeleteHotelServiceImages] = useMutation(
    HoteleManagerDeleteHotelServiceImage,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: data.sellerDeleteHotelServiceimage.message,
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  const [sellerDeleteHotelServiceImages] = useMutation(
    SellerDeleteHotelServiceImage,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: data.sellerDeleteHotelServiceimage.message,
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  //HotelManagerDeleteRoomType
  const [hotleManagerDeleteRoomType] = useMutation(HotelManagerDeleteRoomType, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: "Room type deleted successfully.",
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [sellerDeleteRoomType] = useMutation(SellerDeleteRoomType, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerDeleteRoomType.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [deleteRoomType] = useMutation(DeleteRoomType, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.deleteRoomType.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelManagerDeleteRoomTypeImage
  const [hotleManagerDeleteRoomTypeImage] = useMutation(
    HotelManagerDeleteRoomTypeImage,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: "Room catagory image deleted successfully. ",
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  const [sellerDeleteRoomTypeImage] = useMutation(SellerDeleteRoomTypeImage, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerDeleteRoomImages.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [deleteRoomTypeImage] = useMutation(DeleteRoomTypeImage, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.deleteRoomImages.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelManagerDeleteRoom
  const [hotelManagerDeleteRoom] = useMutation(HotelManagerDeleteRoom, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: "Room successfully deleted.",
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //SellerDeleteRoom
  const [sellerDeleteRoom] = useMutation(SellerDeleteRoom, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerDeleteRoom.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [deleteRoom] = useMutation(DeleteRoom, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.deleteRoom.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotleManagerAddRoom
  const [hotelMangerAddRoom] = useMutation(HotleManagerAddRoom, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: "Room successfully added.",
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //SellerAddRoom
  const [sellerAddRoom] = useMutation(SellerAddRoom, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerAddRoom.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [addRoom] = useMutation(AddRoom, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.addRoom.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelManagerUpdateRoomInfo
  const [hotelManagerUpdateRoom] = useMutation(HotelManagerUpdateRoomInfo, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: "Room successfully updated.",
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //SellerUpdateRoomInfo
  const [sellerUpdateRoom] = useMutation(SellerUpdateRoomInfo, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerUpdateRoom.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [updateRoom] = useMutation(UpdateRoomInfo, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.updateRoom.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //SellerUpdateHotelService
  const [hotelMangerUpdateHotelService] = useMutation(
    HotelMangerUpdateHotelService,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: data.hotelMangerUpdateHotelService.message,
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  const [sellerUpdateHotelService] = useMutation(SellerUpdateHotelService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerUpdateHotelService.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [updateHotelService] = useMutation(UpdateHotelService, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.updateHotelService.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelManagerAddServiceToRoom
  const [hotelManagerAddRoomServiceToRoom] = useMutation(
    HotelManagerAddServiceToRoom,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: "Services successfully setted.",
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  //SellerAddServiceToRoom
  const [sellerAddRoomServiceToRoom] = useMutation(SellerAddServiceToRoom, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerAddRoomServiceToRoom.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [addRoomServiceToRoom] = useMutation(AddServiceToRoom, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.addRoomServiceToRoom.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [addRoomCatagory] = useMutation(AddRoomCatagory, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.addRoomType.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelManagerAddRoomCatagory
  const [hotelManagerAddRoomCatagory] = useMutation(
    HotelManagerAddRoomCatagory,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: data.hotelManagerAddRoomType.message,
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  const [sellerAddRoomCatagory] = useMutation(SellerAddRoomCatagory, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerAddRoomType.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  //HotelManagerUpdateRoomCatagory
  const [hotelManagerUpdateRoomCatagory] = useMutation(
    HotelManagerUpdateRoomCatagory,
    {
      context: {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      },
      onCompleted: (data) =>
        NotifyMessage({
          message: "Room catagory successfully updated.",
          type: "success",
        }),

      onError: (error) =>
        NotifyMessage({ message: error.message, type: "error" }),
    }
  );
  const [sellerUpdateRoomCatagory] = useMutation(SellerUpdateRoomCatagory, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.sellerUpdateRoomCatagory.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });
  const [updateRoomCatagory] = useMutation(UpdateRoomCatagory, {
    context: {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    },
    onCompleted: (data) =>
      NotifyMessage({
        message: data.updateRoomCatagory.message,
        type: "success",
      }),

    onError: (error) =>
      NotifyMessage({ message: error.message, type: "error" }),
  });

  return {
    hotelManagerAddService,
    hotelManagerDeleteService,
    hotelMangerUpdateHotelService,
    hotelManagerHotelImageUpload,
    hotelManagerDeleteHotelImages,
    hotelManagerAddRoomCatagory,
    hotelManagerUpdateRoomCatagory,
    hotleManagerDeleteRoomType,
    hotelManagerRoomTypeImageUpload,
    hotleManagerDeleteRoomTypeImage,
    hotelMangerAddRoom,
    hotelManagerDeleteRoom,
    hotelManagerUpdateRoom,
    hotelManagerAddRoomServiceToRoom,
    hotelManagerHotelImageUploadd,
    sellerRoomTypeImageUpload,
    sellerDeleteHotelServiceImages,
    sellerHotelServiceImageUpload,
    sellerAddService,
    addService,
    hotelHotelDeleteHotelImages,
    sellerDeleteService,
    deleteService,
    roomTypeImageUpload,
    hotelImageUpload,
    deleteRoomType,
    hotelServiceImageUpload,
    deleteHotelImages,
    sellerDeleteRoomType,
    addRoomServiceToRoom,
    updateHotelService,
    sellerUpdateHotelService,
    sellerDeleteRoomTypeImage,
    deleteRoom,
    sellerAddRoomCatagory,
    addRoom,
    sellerUpdateRoom,
    updateRoom,
    deleteRoomTypeImage,
    addRoomCatagory,
    updateRoomCatagory,
    deleteHotelServiceImages,
    sellerUpdateRoomCatagory,
    sellerAddRoomServiceToRoom,
    sellerAddRoom,
    sellerDeleteRoom,
    sellerHotelImageUpload,
    sellerDeleteHotelImages,
    hotelManagerDeleteHotelServiceImages,
    notify,
    setNotify,
  };
};

export default HotelActivities;
