package nus.iss.miniproj.ProjService;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import nus.iss.miniproj.ProjRepo.MongoRepo;
import nus.iss.miniproj.Utils.Utils;
import nus.iss.miniproj.model.PersonalData;

@Service
public class MongoService {
    
    @Autowired
    MongoRepo mongoRepo;

    public void insertData(Document doc) {

        // mongoRepo.insertData(Utils.toDocument(pd));

        return;
    }
}
